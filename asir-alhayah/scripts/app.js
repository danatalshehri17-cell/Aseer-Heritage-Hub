window.AsirApp = (function() {
  const state = {
    cart: JSON.parse(localStorage.getItem("asir_cart") || "[]"),
    bookings: JSON.parse(localStorage.getItem("asir_bookings") || "[]")
  };

  function save() {
    localStorage.setItem("asir_cart", JSON.stringify(state.cart));
    localStorage.setItem("asir_bookings", JSON.stringify(state.bookings));
  }

  function addToCart(productId, qty = 1) {
    const product = AsirData.products.find(p => p.id === productId);
    if (!product) return;
    const existing = state.cart.find(i => i.productId === productId);
    if (existing) existing.qty += qty; else state.cart.push({ productId, qty });
    save();
    alert("تمت الإضافة إلى السلة");
  }

  function bookExperience(experienceId, when) {
    const exp = AsirData.experiences.find(e => e.id === experienceId);
    if (!exp) return;
    state.bookings.push({ id: `b_${Date.now()}`, experienceId, when, status: "confirmed" });
    save();
    alert("تم تأكيد الحجز");
  }

  function currency(n) { return `${n.toFixed(2)} ر.س` }

  function createTile({ image, title, meta, actions = [] }) {
    const el = document.createElement("div");
    el.className = "tile";
    el.innerHTML = `
      <img src="${image}" alt="${title}" />
      <div class="tile__body">
        <div class="tile__title">${title}</div>
        <div class="tile__meta">${meta}</div>
        <div class="tile__actions"></div>
      </div>
    `;
    const actionsEl = el.querySelector('.tile__actions');
    actions.forEach(btn => actionsEl.appendChild(btn));
    return el;
  }

  function button(text, onClick, primary = false) {
    const a = document.createElement("button");
    a.className = primary ? "btn btn--primary" : "btn";
    a.textContent = text;
    a.onclick = onClick;
    return a;
  }

  function renderPopularExperiences() {
    const host = document.getElementById("popular-experiences");
    if (!host) return;
    host.innerHTML = "";
    AsirData.experiences.forEach(exp => {
      const mus = AsirData.museums.find(m => m.id === exp.museumId);
      const tile = createTile({
        image: mus?.images?.[0] || "",
        title: `${exp.title} — ${currency(exp.price)}`,
        meta: `${mus?.name || ''} • ${exp.duration}`,
        actions: [
          button("احجز الآن", () => {
            const when = prompt("اختر التاريخ/الوقت (مثال: 2025-11-05 16:00)");
            if (when) bookExperience(exp.id, when);
          }, true)
        ]
      });
      host.appendChild(tile);
    });
  }

  function renderPopularProducts() {
    const host = document.getElementById("popular-products");
    if (!host) return;
    host.innerHTML = "";
    AsirData.products.forEach(p => {
      const v = AsirData.vendors.find(v => v.id === p.vendorId);
      const tile = createTile({
        image: p.image,
        title: `${p.name} — ${currency(p.price)}`,
        meta: `${v?.name || ''} • متوفر: ${p.stock}`,
        actions: [
          button("أضف للسلة", () => addToCart(p.id), true)
        ]
      });
      host.appendChild(tile);
    });
  }

  function renderMuseumsList() {
    const list = document.getElementById("museums-list");
    if (!list) return;
    list.innerHTML = "";
    AsirData.museums.forEach(m => {
      const row = document.createElement("div");
      row.className = "list__item";
      row.innerHTML = `
        <img src="${m.images[0]}" alt="${m.name}" />
        <div>
          <div class="tile__title">${m.name}</div>
          <div class="list__meta">${m.city} • ساعات العمل: ${m.hours} • التقييم ${m.rating}</div>
          <div class="tile__actions"></div>
        </div>
      `;
      const actions = row.querySelector('.tile__actions');
      actions.appendChild(button("احجز تجربة", () => {
        const firstExp = AsirData.experiences.find(e => e.museumId === m.id);
        if (!firstExp) return alert("لا توجد تجارب حالياً");
        const when = prompt("اختر التاريخ/الوقت (مثال: 2025-11-05 16:00)");
        if (when) bookExperience(firstExp.id, when);
      }, true));
      list.appendChild(row);
    });
  }

  function renderVendors() {
    const grid = document.getElementById("vendors-grid");
    if (!grid) return;
    grid.innerHTML = "";
    AsirData.vendors.forEach(v => {
      const tile = createTile({
        image: v.images[0],
        title: v.name,
        meta: `${v.category} • التقييم ${v.rating}`,
        actions: [
          button("عرض المنتجات", () => {
            location.href = `./vendors.html?v=${v.id}`;
          }, true)
        ]
      });
      grid.appendChild(tile);
    });

    // If vendor selected, show products below
    const params = new URLSearchParams(location.search);
    const vendorId = params.get('v');
    const vendorProducts = document.getElementById('vendor-products');
    if (vendorId && vendorProducts) {
      vendorProducts.innerHTML = "";
      AsirData.products.filter(p => p.vendorId === vendorId).forEach(p => {
        const tile = createTile({
          image: p.image,
          title: `${p.name} — ${currency(p.price)}`,
          meta: `متوفر: ${p.stock}`,
          actions: [button("أضف للسلة", () => addToCart(p.id), true)]
        });
        vendorProducts.appendChild(tile);
      });
    }
  }

  function renderCart() {
    const list = document.getElementById('cart-list');
    const totalEl = document.getElementById('cart-total');
    const bookingsList = document.getElementById('bookings-list');
    if (!list || !totalEl || !bookingsList) return;

    list.innerHTML = ""; bookingsList.innerHTML = "";
    let total = 0;

    state.cart.forEach(item => {
      const p = AsirData.products.find(x => x.id === item.productId);
      if (!p) return;
      const row = document.createElement('div');
      row.className = 'list__item';
      const line = p.price * item.qty; total += line;
      row.innerHTML = `
        <img src="${p.image}" alt="${p.name}" />
        <div>
          <div class="tile__title">${p.name} — ${currency(p.price)}</div>
          <div class="list__meta">الكمية: ${item.qty} • الإجمالي: ${currency(line)}</div>
          <div class="tile__actions"></div>
        </div>
      `;
      const actions = row.querySelector('.tile__actions');
      actions.appendChild(button("-", () => { item.qty = Math.max(1, item.qty - 1); save(); renderCart(); }));
      actions.appendChild(button("+", () => { item.qty += 1; save(); renderCart(); }));
      actions.appendChild(button("حذف", () => { state.cart = state.cart.filter(i => i !== item); save(); renderCart(); }));
      list.appendChild(row);
    });

    state.bookings.forEach(b => {
      const e = AsirData.experiences.find(x => x.id === b.experienceId);
      const m = e ? AsirData.museums.find(mm => mm.id === e.museumId) : null;
      const row = document.createElement('div');
      row.className = 'list__item';
      row.innerHTML = `
        <img src="${m?.images?.[0] || ''}" alt="${e?.title || ''}" />
        <div>
          <div class="tile__title">${e?.title || ''}</div>
          <div class="list__meta">${m?.name || ''} • ${b.when} • الحالة: ${b.status}</div>
          <div class="tile__actions"></div>
        </div>
      `;
      bookingsList.appendChild(row);
    });

    totalEl.textContent = currency(total);
  }

  return {
    addToCart,
    bookExperience,
    renderPopularExperiences,
    renderPopularProducts,
    renderMuseumsList,
    renderVendors,
    renderCart
  };
})();


