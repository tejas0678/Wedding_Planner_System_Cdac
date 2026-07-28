// Admin Service returning demo data for admin workspace management

const delay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardStats() {
  await delay();

  return {
    totalClients: 124,
    totalPlanners: 18,
    totalWeddings: 42,
    totalPackages: 12,
    pendingBookings: 8,
    recentActivities: [
      {
        id: 1,
        clientName: "TEJASSAYANE067 & Meera Kapoor",
        plannerName: "Royal Touch Weddings Studio",
        venue: "The Leela Palace, Udaipur",
        date: "Nov 20, 2026",
        status: "Payment Completed",
        amount: "₹7,65,600",
      },
      {
        id: 2,
        clientName: "Rahul & Divya Kulkarni",
        plannerName: "Destination Forever Planners",
        venue: "Taj Exotica, Goa",
        date: "Dec 15, 2026",
        status: "Planner Confirmed",
        amount: "₹7,20,000",
      },
      {
        id: 3,
        clientName: "Aarav & Ananya Sharma",
        plannerName: "Vedic Sutra Celebrations",
        venue: "City Palace, Jaipur",
        date: "Jan 10, 2027",
        status: "Quotation Pending",
        amount: "₹8,50,000",
      },
    ],
    topPlanners: [
      {
        id: 1,
        name: "Royal Touch Weddings Studio",
        specialization: "Royal Destination & Mandap Decor",
        city: "Mumbai",
        rating: "4.9",
        reviews: 128,
        earnings: "₹85.0 Lakhs",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200",
      },
      {
        id: 2,
        name: "Vedic Sutra Celebrations",
        specialization: "Heritage Forts & Palace Mandaps",
        city: "Udaipur",
        rating: "4.8",
        reviews: 95,
        earnings: "₹62.5 Lakhs",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200",
      },
      {
        id: 3,
        name: "Destination Forever Planners",
        specialization: "Sunset Beach Romance",
        city: "Goa",
        rating: "4.9",
        reviews: 110,
        earnings: "₹54.0 Lakhs",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200",
      },
    ],
  };
}

export async function getClients() {
  await delay();
  return [
    {
      id: "CLT-1001",
      name: "TEJASSAYANE067",
      email: "tejas0678@gmail.com",
      phone: "+91 98765 43210",
      status: "Active",
      created: "2026-05-12",
    },
    {
      id: "CLT-1002",
      name: "Meera Kapoor",
      email: "meera.k@gmail.com",
      phone: "+91 98220 11223",
      status: "Active",
      created: "2026-06-01",
    },
    {
      id: "CLT-1003",
      name: "Rahul Kulkarni",
      email: "rahul.kulkarni@gmail.com",
      phone: "+91 97654 88990",
      status: "Active",
      created: "2026-06-18",
    },
    {
      id: "CLT-1004",
      name: "Ananya Sharma",
      email: "ananya.sharma@gmail.com",
      phone: "+91 91234 56789",
      status: "Active",
      created: "2026-07-04",
    },
  ];
}

export async function getPlanners() {
  await delay();
  return [
    {
      id: "PLN-2001",
      name: "Royal Touch Weddings Studio",
      agency: "Royal Touch Events Pvt Ltd",
      email: "info@royaltouch.com",
      phone: "+91 98111 22334",
      city: "Mumbai",
      experience: "8 Years",
      rating: "4.9",
      status: "Approved",
    },
    {
      id: "PLN-2002",
      name: "Vedic Sutra Celebrations",
      agency: "Vedic Sutra Hospitality",
      email: "contact@vedicsutra.in",
      phone: "+91 98222 33445",
      city: "Udaipur",
      experience: "12 Years",
      rating: "4.8",
      status: "Approved",
    },
    {
      id: "PLN-2003",
      name: "Destination Forever Planners",
      agency: "Destination Forever Beach Events",
      email: "hello@destinationforever.com",
      phone: "+91 98333 44556",
      city: "Goa",
      experience: "6 Years",
      rating: "4.9",
      status: "Approved",
    },
  ];
}

export async function getBookings() {
  await delay();
  return [
    {
      id: "BK-8001",
      clientName: "TEJASSAYANE067",
      plannerName: "Royal Touch Weddings Studio",
      packageName: "Royal Heritage Destination Package",
      weddingDate: "2026-11-20",
      status: "Confirmed",
      amount: "₹7,65,600",
    },
    {
      id: "BK-8002",
      clientName: "Rahul Kulkarni",
      plannerName: "Destination Forever Planners",
      packageName: "Sunset Beach Romance Package",
      weddingDate: "2026-12-15",
      status: "Confirmed",
      amount: "₹7,20,000",
    },
  ];
}

export async function getPackages() {
  await delay();
  return [
    {
      id: "PKG-501",
      title: "Royal Heritage Destination Package",
      planner: "Royal Touch Weddings Studio",
      price: "₹7,65,600",
      category: "Royal Destination",
      capacity: "300 Guests",
      status: "Published",
    },
    {
      id: "PKG-502",
      title: "Sunset Beach Romance Package",
      planner: "Destination Forever Planners",
      price: "₹7,20,000",
      category: "Beach Romance",
      capacity: "200 Guests",
      status: "Published",
    },
    {
      id: "PKG-503",
      title: "Grand Palace Sangeet Spectacle",
      planner: "Vedic Sutra Celebrations",
      price: "₹8,50,000",
      category: "Traditional Sangeet",
      capacity: "400 Guests",
      status: "Published",
    },
  ];
}

export async function getPayments() {
  await delay();
  return [
    {
      id: "PAY-9001",
      bookingId: "BK-8001",
      client: "TEJASSAYANE067",
      amount: "₹2,29,680",
      type: "30% Advance Payment",
      status: "Successful",
      date: "2026-07-28",
      gateway: "Razorpay",
    },
    {
      id: "PAY-9002",
      bookingId: "BK-8002",
      client: "Rahul Kulkarni",
      amount: "₹2,16,000",
      type: "30% Advance Payment",
      status: "Successful",
      date: "2026-07-25",
      gateway: "Razorpay",
    },
  ];
}

export async function getFeedbacks() {
  await delay();
  return [
    {
      id: "FBD-101",
      client: "TEJASSAYANE067",
      planner: "Royal Touch Weddings Studio",
      rating: 5,
      comment: "Exceptional royal decor and flawless execution at Lake Palace!",
      date: "2026-07-28",
    },
    {
      id: "FBD-102",
      client: "Rahul Kulkarni",
      planner: "Destination Forever Planners",
      rating: 5,
      comment: "Unforgettable beach setup and sunset lighting in Goa.",
      date: "2026-07-26",
    },
  ];
}