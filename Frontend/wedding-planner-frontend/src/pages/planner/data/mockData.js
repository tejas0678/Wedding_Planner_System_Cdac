// ============= MOCK DATA =============
export const mockData = {
  planners: [
    { 
      planner_id: 1, 
      name: 'John Doe', 
      email: 'john@example.com', 
      experience: '5 years', 
      specialization: 'Wedding Decoration', 
      status: 'Approved', 
      bio: 'Expert wedding planner with 5+ years of experience creating dream weddings.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&h=200&q=80' 
    }
  ],
  weddings: [
    { 
      wedding_id: 'W001', 
      client_id: 1, 
      planner_id: 1, 
      package_id: 1, 
      date: '2026-12-20', 
      venue: 'Grand Hotel', 
      budget: 50000, 
      status: 'Pending' 
    },
    { 
      wedding_id: 'W002', 
      client_id: 2, 
      planner_id: 1, 
      package_id: 2, 
      date: '2026-11-15', 
      venue: 'Beach Resort', 
      budget: 35000, 
      status: 'Accepted' 
    },
    { 
      wedding_id: 'W003', 
      client_id: 3, 
      planner_id: 1, 
      package_id: 1, 
      date: '2026-10-05', 
      venue: 'Garden Estate', 
      budget: 45000, 
      status: 'Completed' 
    }
  ],
  clients: [
    { client_id: 1, name: 'Sarah & Mike Johnson' },
    { client_id: 2, name: 'Emily & James Wilson' },
    { client_id: 3, name: 'Anna & David Lee' }
  ],
  packages: [
    { package_id: 1, name: 'Premium Package' },
    { package_id: 2, name: 'Standard Package' }
  ],
  services: [
    { 
      plannerService_id: 's1', 
      planner_id: 1, 
      name: 'Full Wedding Planning', 
      price: 5000, 
      description: 'Complete wedding planning from start to finish' 
    },
    { 
      plannerService_id: 's2', 
      planner_id: 1, 
      name: 'Day-of Coordination', 
      price: 1500, 
      description: 'Professional coordination on your wedding day' 
    }
  ],
  images: [
    { 
      image_id: 'i1', 
      planner_id: 1, 
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&h=300&q=80',
      upload_time: '2026-01-15' 
    },
    { 
      image_id: 'i2', 
      planner_id: 1, 
      image_url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&h=300&q=80',
      upload_time: '2026-01-20' 
    }
  ],
  tasks: [
    { task_id: 't1', wedding_id: 'W001', task_name: 'Venue Booking', status: 'Pending' },
    { task_id: 't2', wedding_id: 'W001', task_name: 'Catering', status: 'In Progress' },
    { task_id: 't3', wedding_id: 'W002', task_name: 'Decoration', status: 'Completed' }
  ],
  payments: [
    { payment_id: 'p1', wedding_id: 'W001', amount: 10000, status: 'Paid' },
    { payment_id: 'p2', wedding_id: 'W002', amount: 5000, status: 'Pending' }
  ],
  feedback: [
    { 
      feedback_id: 'f1', 
      planner_id: 1, 
      client_id: 1, 
      rating: 5, 
      comment: 'Amazing planner! Highly recommended. Made our dream wedding come true!', 
      date: '2026-01-10' 
    },
    { 
      feedback_id: 'f2', 
      planner_id: 1, 
      client_id: 3, 
      rating: 4, 
      comment: 'Great experience overall. Very professional and organized.', 
      date: '2026-01-05' 
    }
  ]
};