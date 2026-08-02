package com.cdac.weddingplanner.common.config;

import com.cdac.weddingplanner.auth.entity.Role;
import com.cdac.weddingplanner.auth.entity.User;
import com.cdac.weddingplanner.auth.repository.UserRepository;
import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.entity.CustomizationRequest;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.client.repository.CustomizationRequestRepository;
import com.cdac.weddingplanner.planner.entity.*;
import com.cdac.weddingplanner.planner.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;
    private final VenueRepository venueRepository;
    private final PlannerPackageRepository packageRepository;
    private final CateringRepository cateringRepository;
    private final DecorationRepository decorationRepository;
    private final VendorRepository vendorRepository;
    private final CustomizationRequestRepository customizationRequestRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(
            UserRepository userRepository,
            BookingRepository bookingRepository,
            VenueRepository venueRepository,
            PlannerPackageRepository packageRepository,
            CateringRepository cateringRepository,
            DecorationRepository decorationRepository,
            VendorRepository vendorRepository,
            CustomizationRequestRepository customizationRequestRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
        this.venueRepository = venueRepository;
        this.packageRepository = packageRepository;
        this.cateringRepository = cateringRepository;
        this.decorationRepository = decorationRepository;
        this.vendorRepository = vendorRepository;
        this.customizationRequestRepository = customizationRequestRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println(">>> [DATA INITIALIZER] Initializing MySQL Database Sample Data...");
        seedUsers();
        seedVenues();
        seedPackages();
        seedCatering();
        seedDecorations();
        seedVendors();
        seedBookings();
        seedCustomizations();
        System.out.println(">>> [DATA INITIALIZER SUCCESS] Seeded Users: " + userRepository.count()
                + ", Venues: " + venueRepository.count()
                + ", Packages: " + packageRepository.count()
                + ", Catering: " + cateringRepository.count()
                + ", Decorations: " + decorationRepository.count()
                + ", Vendors: " + vendorRepository.count()
                + ", Bookings: " + bookingRepository.count());
    }

    private void seedUsers() {
        // 1. Admin
        if (userRepository.findByEmail("admin@wedplan.com").isEmpty()) {
            User admin = User.builder()
                    .fullName("System Administrator")
                    .email("admin@wedplan.com")
                    .password(passwordEncoder.encode("Admin@123"))
                    .role(Role.ADMIN)
                    .phone("9999999999")
                    .enabled(true)
                    .build();
            userRepository.save(admin);
        }

        // 2. 5 Planners
        // 2. Planners across cities
        String[] plannerNames = {
            "Royal Touch Weddings Studio", "Blissful Events Pune", "Destination Forever Planners",
            "Royal Bliss Studio", "Elegance & Charm Weddings", "Grandeur Celebrations", "Imperial Nagpur Events"
        };
        String[] plannerEmails = {
            "planner@gmail.com", "planner2@wedplan.com", "planner3@wedplan.com",
            "planner4@wedplan.com", "planner5@wedplan.com", "planner6@wedplan.com", "planner7@wedplan.com"
        };
        String[] plannerCities = {
            "Pune", "Pune", "Mumbai", "Mumbai", "Jaipur", "Udaipur", "Nagpur"
        };
        String[] plannerPrices = {
            "₹2,50,000", "₹1,80,000", "₹3,00,000", "₹2,20,000", "₹2,00,000", "₹3,50,000", "₹1,50,000"
        };
        String[] plannerExps = {
            "10 Years", "6 Years", "12 Years", "8 Years", "7 Years", "15 Years", "5 Years"
        };
        Double[] plannerRatings = {
            4.9, 4.8, 4.9, 4.7, 4.8, 5.0, 4.6
        };

        for (int i = 0; i < plannerNames.length; i++) {
            User planner = userRepository.findByEmail(plannerEmails[i]).orElse(null);
            if (planner == null) {
                planner = User.builder()
                        .fullName(plannerNames[i] + " Owner")
                        .businessName(plannerNames[i])
                        .email(plannerEmails[i])
                        .password(passwordEncoder.encode("123456"))
                        .role(Role.PLANNER)
                        .phone("987654321" + i)
                        .city(plannerCities[i])
                        .experience(plannerExps[i])
                        .rating(plannerRatings[i])
                        .startingPrice(plannerPrices[i])
                        .description("Premier bespoke wedding planning studio in " + plannerCities[i] + " specialising in luxury decor, venue orchestration, and guest concierge.")
                        .avatarUrl("https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop")
                        .enabled(true)
                        .build();
            } else {
                planner.setCity(plannerCities[i]);
                planner.setExperience(plannerExps[i]);
                planner.setRating(plannerRatings[i]);
                planner.setStartingPrice(plannerPrices[i]);
                planner.setDescription("Premier bespoke wedding planning studio in " + plannerCities[i] + " specialising in luxury decor, venue orchestration, and guest concierge.");
                planner.setAvatarUrl("https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop");
            }
            userRepository.save(planner);
        }

        // 3. 10 Clients
        for (int i = 1; i <= 10; i++) {
            String clientEmail = i == 1 ? "client@gmail.com" : "client" + i + "@wedplan.com";
            if (userRepository.findByEmail(clientEmail).isEmpty()) {
                User client = User.builder()
                        .fullName("Client User " + i)
                        .email(clientEmail)
                        .password(passwordEncoder.encode("123456"))
                        .role(Role.USER)
                        .phone("912345678" + (i % 10))
                        .enabled(true)
                        .build();
                userRepository.save(client);
            }
        }
    }

    private void seedVenues() {
        if (venueRepository.count() == 0) {
            String[] cities = {"Udaipur", "Goa", "Jaipur", "Mumbai", "Delhi", "Bengaluru", "Kerala", "Mussoorie", "Jodhpur", "Agra"};
            for (int i = 1; i <= 10; i++) {
                Venue v = Venue.builder()
                        .plannerId((long) ((i % 5) + 1))
                        .name("Palace Resort & Spa - " + cities[i - 1])
                        .location(cities[i - 1])
                        .capacity(200 + i * 50)
                        .price(new BigDecimal(300000 + i * 50000))
                        .description("Luxury wedding destination venue in " + cities[i - 1] + " featuring scenic views and premium banquet halls.")
                        .build();
                venueRepository.save(v);
            }
        }
    }

    private void seedPackages() {
        if (packageRepository.count() == 0) {
            List<User> planners = userRepository.findByRoleAndEnabledTrue(Role.PLANNER);
            if (planners.isEmpty()) return;

            String[] categories = {"Royal Heritage", "Seaside Romance", "Palace Luxury", "Garden Bliss", "Vedic Rituals"};
            String[] images = {
                "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop"
            };

            for (User p : planners) {
                Long pId = p.getId();
                String studio = p.getBusinessName() != null ? p.getBusinessName() : "Studio " + pId;
                String pCity = p.getCity() != null ? p.getCity() : "Pune";

                PlannerPackage p1 = PlannerPackage.builder()
                        .plannerId(pId)
                        .packageName(studio + " - Premium Grand Wedding")
                        .price(new BigDecimal(500000))
                        .category("Royal Heritage")
                        .eventType("Wedding")
                        .theme("Royal Heritage")
                        .city(pCity)
                        .image(images[0])
                        .status("Active")
                        .servicesIncluded("Full Planning, Catering, Floral Mandap, Sangeet Stage, DJ & Entertainment")
                        .description("Bespoke luxury package curated by " + studio + " in " + pCity + " with 3-day full management.")
                        .build();
                packageRepository.save(p1);

                PlannerPackage p2 = PlannerPackage.builder()
                        .plannerId(pId)
                        .packageName(studio + " - Luxury Destination Wedding")
                        .price(new BigDecimal(750000))
                        .category("Beach Romance")
                        .eventType("Destination Wedding")
                        .theme("Beach Romance")
                        .city(pCity)
                        .image(images[1])
                        .status("Active")
                        .servicesIncluded("Palace Venue Booking, 5-Star Catering, Celebrity Artist, Fireworks Display")
                        .description("All-inclusive grand destination wedding orchestration by " + studio + " in " + pCity + ".")
                        .build();
                packageRepository.save(p2);

                PlannerPackage p3 = PlannerPackage.builder()
                        .plannerId(pId)
                        .packageName(studio + " - Sangeet & Musical Extravaganza")
                        .price(new BigDecimal(350000))
                        .category("Palace Luxury")
                        .eventType("Sangeet")
                        .theme("Palace Luxury")
                        .city(pCity)
                        .image(images[2])
                        .status("Active")
                        .servicesIncluded("LED Stage, Bollywood Choreographers, Live Concert Sound & Lighting, Catering")
                        .description("High-energy Sangeet night setup curated by " + studio + ".")
                        .build();
                packageRepository.save(p3);
            }
        }
    }

    private void seedCatering() {
        if (cateringRepository.count() == 0) {
            String[] cuisines = {"North Indian Royal", "South Indian Traditional", "Multi-Cuisine Gourmet", "Italian & Continental", "Asian Fusion"};
            for (int i = 1; i <= 10; i++) {
                CateringService cs = CateringService.builder()
                        .plannerId((long) ((i % 5) + 1))
                        .menuName("Grand Banquet Menu " + i)
                        .cuisineType(cuisines[i % cuisines.length])
                        .pricePerPlate(new BigDecimal(1200 + i * 150))
                        .description("Exquisite multi-course live buffet counters with live dessert stations.")
                        .build();
                cateringRepository.save(cs);
            }
        }
    }

    private void seedDecorations() {
        if (decorationRepository.count() == 0) {
            String[] themes = {
                "Royal Palace Gold", "Sunset Pastel Floral", "Vintage Crystal Chandelier",
                "Traditional Marigold Lotus", "Bohemian Beach Mandap", "Red Velvet Imperial",
                "Eco-Friendly Greenery", "Fairytale Starlight Glitz", "Marwari Heritage Craft", "Contemporary Glass Dome"
            };
            for (int i = 0; i < themes.length; i++) {
                DecorationOption d = DecorationOption.builder()
                        .plannerId((long) ((i % 5) + 1))
                        .themeName(themes[i])
                        .price(new BigDecimal(150000 + i * 25000))
                        .description("Bespoke theme setup featuring handcrafted entrance arches and floral stage setups.")
                        .build();
                decorationRepository.save(d);
            }
        }
    }

    private void seedVendors() {
        if (vendorRepository.count() == 0) {
            String[] categories = {"Photographer", "DJ", "Decorator", "Makeup Artist", "Mehendi Artist", "Band"};
            for (int i = 1; i <= 20; i++) {
                Vendor v = Vendor.builder()
                        .plannerId((long) ((i % 5) + 1))
                        .vendorName("Vendor Partner " + i)
                        .category(categories[i % categories.length])
                        .phone("98000111" + String.format("%02d", i))
                        .email("vendor" + i + "@wedplan.com")
                        .build();
                vendorRepository.save(v);
            }
        }
    }

    private void seedBookings() {
        if (bookingRepository.count() == 0) {
            List<User> clients = userRepository.findByRoleAndEnabledTrue(Role.USER);
            if (clients.isEmpty()) return;

            User client = clients.get(0);
            
            Booking b1 = Booking.builder()
                    .user(client)
                    .packageId(1L)
                    .plannerId(2L)
                    .packageName("Royal Heritage Package")
                    .plannerName("Priya Sharma")
                    .guestCount("300 Guests")
                    .eventDate(LocalDate.now().plusDays(45))
                    .venueName("The Leela Palace Resort, Udaipur")
                    .status(Booking.BookingStatus.CONFIRMED)
                    .totalAmount(new BigDecimal(1200000))
                    .paidAmount(new BigDecimal(600000))
                    .paymentStatus(Booking.PaymentStatus.PARTIALLY_PAID)
                    .notes("Client requested additional floral arrangements.")
                    .build();

            Booking b2 = Booking.builder()
                    .user(client)
                    .packageId(2L)
                    .plannerId(2L)
                    .packageName("Seaside Romance Package")
                    .plannerName("Priya Sharma")
                    .guestCount("150 Guests")
                    .eventDate(LocalDate.now().plusDays(12))
                    .venueName("Taj Exotica, Goa")
                    .status(Booking.BookingStatus.PENDING)
                    .totalAmount(new BigDecimal(850000))
                    .paidAmount(BigDecimal.ZERO)
                    .paymentStatus(Booking.PaymentStatus.PENDING)
                    .notes("Pending confirmation from planner.")
                    .build();

            bookingRepository.saveAll(List.of(b1, b2));
        }
    }

    private void seedCustomizations() {
        if (customizationRequestRepository.count() == 0) {
            List<Booking> bookings = bookingRepository.findAll();
            if (bookings.isEmpty()) return;
            Booking b = bookings.get(0);

            CustomizationRequest req = CustomizationRequest.builder()
                    .booking(b)
                    .client(b.getUser())
                    .plannerId(b.getPlannerId())
                    .packageId(b.getPackageId())
                    .foodPreference("Jain Food Options Required")
                    .welcomeDrink(true)
                    .drinkName("Fresh Coconut Water")
                    .drinkQuantity(300)
                    .preWeddingShoot(true)
                    .shootLocation("Udaipur City Palace")
                    .shootDuration("2 Days")
                    .cinematicVideo(true)
                    .djRequired(true)
                    .djType("Bollywood & EDM")
                    .updatedPrice(b.getTotalAmount().add(new BigDecimal(50000)))
                    .status(CustomizationRequest.CustomizationStatus.PENDING)
                    .build();

            customizationRequestRepository.save(req);
        }
    }
}
