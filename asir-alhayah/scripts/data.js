window.AsirData = (function() {
  const museums = [
    {
      id: "m1",
      name: "متحف رجال ألمع",
      description: "متحف تراثي يعرض تاريخ رجال ألمع وثقافة عسير.",
      location: { lat: 18.229, lng: 42.407 },
      city: "رجال ألمع",
      hours: "9ص - 6م",
      images: ["https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop"],
      price: 30,
      capacity: 40,
      rating: 4.8
    },
    {
      id: "m2",
      name: "متحف أبها التراثي",
      description: "تجربة حية للمنازل العسيرية القديمة ومقتنيات نادرة.",
      location: { lat: 18.216, lng: 42.505 },
      city: "أبها",
      hours: "10ص - 8م",
      images: ["https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop"],
      price: 25,
      capacity: 30,
      rating: 4.6
    }
  ];

  const vendors = [
    {
      id: "v1",
      name: "أسرة الوادي",
      category: "أطعمة تراثية",
      story: "وصفات عسيرية متوارثة عبر الأجيال.",
      pickup_location: "أبها - وسط المدينة",
      images: ["https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1200&auto=format&fit=crop"],
      rating: 4.7
    },
    {
      id: "v2",
      name: "بيت السدو",
      category: "حِرف ومنسوجات",
      story: "حياكة يدوية بنقوش عسيرية أصيلة.",
      pickup_location: "خميس مشيط",
      images: ["https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop"],
      rating: 4.5
    }
  ];

  const products = [
    { id: "p1", vendorId: "v1", name: "عسل سدر عسيري", price: 80, stock: 20, image: "https://images.unsplash.com/photo-1471943038886-87c772c9d776?q=80&w=1200&auto=format&fit=crop" },
    { id: "p2", vendorId: "v1", name: "خبز تنور", price: 10, stock: 100, image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1200&auto=format&fit=crop" },
    { id: "p3", vendorId: "v2", name: "سجاد يدوي", price: 350, stock: 5, image: "https://images.unsplash.com/photo-1520975922211-230f2491984b?q=80&w=1200&auto=format&fit=crop" }
  ];

  const experiences = [
    { id: "e1", museumId: "m1", title: "جولة مرشدة في رجال ألمع", price: 50, slots: 10, duration: "90 دقيقة" },
    { id: "e2", museumId: "m2", title: "ورشة زخرفة قط العسيري", price: 120, slots: 8, duration: "120 دقيقة" }
  ];

  return { museums, vendors, products, experiences };
})();


