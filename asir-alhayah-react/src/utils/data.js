export const museums = [
  {
    id: 'm1',
    name: 'متحف رجال ألمع',
    description: 'متحف تراثي يعرض تاريخ رجال ألمع وثقافة عسير.',
    location: { lat: 18.229, lng: 42.407 },
    city: 'رجال ألمع',
    hours: '9ص - 6م',
    images: ['https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop'],
    price: 30,
    capacity: 40,
    rating: 4.8
  },
  {
    id: 'm2',
    name: 'متحف أبها التراثي',
    description: 'تجربة حية للمنازل العسيرية القديمة ومقتنيات نادرة.',
    location: { lat: 18.216, lng: 42.505 },
    city: 'أبها',
    hours: '10ص - 8م',
    images: ['https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1200&auto=format&fit=crop'],
    price: 25,
    capacity: 30,
    rating: 4.6
  }
]

export const vendors = [
  {
    id: 'v1',
    name: 'أسرة الوادي',
    category: 'أطعمة تراثية',
    story: 'وصفات عسيرية متوارثة عبر الأجيال.',
    pickup_location: 'أبها - وسط المدينة',
    images: ['https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1200&auto=format&fit=crop'],
    rating: 4.7
  },
  {
    id: 'v2',
    name: 'بيت السدو',
    category: 'حِرف ومنسوجات',
    story: 'حياكة يدوية بنقوش عسيرية أصيلة.',
    pickup_location: 'خميس مشيط',
    images: ['https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop'],
    rating: 4.5
  }
]

export const products = [
  { id: 'p1', vendorId: 'v1', name: 'عسل سدر عسيري', price: 80, stock: 20, image: 'https://images.unsplash.com/photo-1471943038886-87c772c9d776?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p2', vendorId: 'v1', name: 'خبز تنور', price: 10, stock: 100, image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1200&auto=format&fit=crop' },
  { id: 'p3', vendorId: 'v2', name: 'سجاد يدوي', price: 350, stock: 5, image: 'https://images.unsplash.com/photo-1520975922211-230f2491984b?q=80&w=1200&auto=format&fit=crop' }
]

export const experiences = [
  { id: 'e1', museumId: 'm1', title: 'جولة مرشدة في رجال ألمع', price: 50, slots: 10, duration: '90 دقيقة' },
  { id: 'e2', museumId: 'm2', title: 'ورشة زخرفة قط العسيري', price: 120, slots: 8, duration: '120 دقيقة' }
]

export const creators = [
  {
    id: 'c1',
    name: 'سارة العسيري',
    category: 'رسم وزخرفة',
    bio: 'فنانة تراثية متخصصة في زخرفة قط العسيري والرسم على الجدران التقليدية.',
    city: 'أبها',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop',
    works: [
      { id: 'w1', title: 'زخرفة عسيرية تقليدية', image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop', description: 'عمل يدوي على قط بألوان تراثية أصيلة' },
      { id: 'w2', title: 'منظر طبيعي من عسير', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop', description: 'رسم زيتي يجسد جمال طبيعة عسير' }
    ],
    contact: 'sara.aseeri@example.com',
    status: 'approved'
  },
  {
    id: 'c2',
    name: 'محمد الشهري',
    category: 'نحت خشبي',
    bio: 'نحات محترف يعمل على نحت القطع التراثية العسيرية من الخشب.',
    city: 'خميس مشيط',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop',
    works: [
      { id: 'w3', title: 'نحت باب عسيري', image: 'https://images.unsplash.com/photo-1583241475889-6c89346c3e5a?q=80&w=800&auto=format&fit=crop', description: 'باب منحوت بخامات محلية بنقوش تراثية' }
    ],
    contact: 'mohammed@example.com',
    status: 'approved'
  },
  {
    id: 'c3',
    name: 'فاطمة القحطاني',
    category: 'تصوير فوتوغرافي',
    bio: 'مصورة تراثية توثق معالم عسير وتقاليدها بالصور.',
    city: 'أبها',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=800&auto=format&fit=crop',
    works: [
      { id: 'w4', title: 'المنازل التراثية', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop', description: 'سلسلة صور توثق العمارة العسيرية التقليدية' }
    ],
    contact: 'fatima@example.com',
    status: 'approved'
  }
]

export const workshops = [
  {
    id: 'w1',
    title: 'ورشة زخرفة قط العسيري',
    description: 'تعلم فن زخرفة القط التقليدي بأيدٍ محترفة',
    instructor: 'سارة العسيري',
    instructorId: 'c1',
    date: '2025-11-15',
    time: '14:00',
    duration: '3 ساعات',
    location: 'أبها - مركز التراث',
    price: 150,
    maxParticipants: 15,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
    category: 'حرف يدوية'
  },
  {
    id: 'w2',
    title: 'ورشة نحت الخشب التراثي',
    description: 'تعلم أساسيات النحت على الخشب بنقوش عسيرية',
    instructor: 'محمد الشهري',
    instructorId: 'c2',
    date: '2025-11-20',
    time: '10:00',
    duration: '4 ساعات',
    location: 'خميس مشيط - ورشة الفنون',
    price: 200,
    maxParticipants: 10,
    image: 'https://images.unsplash.com/photo-1583241475889-6c89346c3e5a?q=80&w=800&auto=format&fit=crop',
    category: 'حرف يدوية'
  },
  {
    id: 'w3',
    title: 'جولة تصوير تراثية',
    description: 'جولة تصوير لمعالم عسير التراثية مع مصورة محترفة',
    instructor: 'فاطمة القحطاني',
    instructorId: 'c3',
    date: '2025-11-18',
    time: '07:00',
    duration: '5 ساعات',
    location: 'أبها - نقطة التجمع: مركز المدينة',
    price: 120,
    maxParticipants: 20,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop',
    category: 'تصوير'
  }
]

export const availableCoupons = [
  { code: 'HERITAGE10', discount: 10, description: 'خصم 10% على جميع الحجوزات', validUntil: '2025-12-31', used: false },
  { code: 'ASIR2025', discount: 15, description: 'خصم 15% على ورش العمل', validUntil: '2025-12-31', used: false },
  { code: 'FIRST50', discount: 50, description: 'خصم 50% للعملاء الجدد (أول طلب)', validUntil: '2025-11-30', used: false }
]

