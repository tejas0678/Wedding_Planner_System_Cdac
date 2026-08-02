package com.cdac.weddingplanner.client.config;

import com.cdac.weddingplanner.client.entity.Booking;
import com.cdac.weddingplanner.client.entity.ClientProfile;
import com.cdac.weddingplanner.client.entity.Payment;
import com.cdac.weddingplanner.client.entity.Planner;
import com.cdac.weddingplanner.client.entity.WeddingPackage;
import com.cdac.weddingplanner.client.repository.BookingRepository;
import com.cdac.weddingplanner.client.repository.ClientProfileRepository;
import com.cdac.weddingplanner.client.repository.PaymentRepository;
import com.cdac.weddingplanner.client.repository.PlannerRepository;
import com.cdac.weddingplanner.client.repository.WeddingPackageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

/**
 * Seeds the same demo catalog the frontend previously loaded from
 * public/mock/*.json, so the client pages have real data on first run.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final PlannerRepository plannerRepository;
    private final WeddingPackageRepository weddingPackageRepository;
    private final BookingRepository bookingRepository;
    private final PaymentRepository paymentRepository;
    private final ClientProfileRepository clientProfileRepository;

    public DataSeeder(PlannerRepository plannerRepository,
                       WeddingPackageRepository weddingPackageRepository,
                       BookingRepository bookingRepository,
                       PaymentRepository paymentRepository,
                       ClientProfileRepository clientProfileRepository) {
        this.plannerRepository = plannerRepository;
        this.weddingPackageRepository = weddingPackageRepository;
        this.bookingRepository = bookingRepository;
        this.paymentRepository = paymentRepository;
        this.clientProfileRepository = clientProfileRepository;
    }

    @Override
    public void run(String... args) {
        if (plannerRepository.count() == 0) {
            seedPlanners();
        }
        if (weddingPackageRepository.count() == 0) {
            seedPackages();
        }
        if (clientProfileRepository.count() == 0) {
            seedDemoClientProfile();
        }
        if (bookingRepository.count() == 0) {
            seedDemoBooking();
        }
        if (paymentRepository.count() == 0) {
            seedDemoPayment();
        }
    }

    private void seedPlanners() {
        Planner royalTouch = new Planner();
        royalTouch.setBusinessName("Royal Touch Weddings Studio");
        royalTouch.setOwnerName("Priya Sharma");
        royalTouch.setCity("Mumbai");
        royalTouch.setRating(4.9);
        royalTouch.setReviewsCount(48);
        royalTouch.setStartingPrice("₹1,50,000");
        royalTouch.setExperience("8 Years");
        royalTouch.setSpecialization("Destination & Palace Weddings");
        royalTouch.setPhone("+91 98765 11111");
        royalTouch.setAvatarUrl("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300");
        royalTouch.setCoverImageUrl("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800");
        royalTouch.setDescription("Premier wedding planning studio specializing in regal setups, celebrity weddings, palace mandaps, and high-production destination events.");

        Planner destinationForever = new Planner();
        destinationForever.setBusinessName("Destination Forever Planners");
        destinationForever.setOwnerName("Aditya Verma");
        destinationForever.setCity("Goa");
        destinationForever.setRating(4.9);
        destinationForever.setReviewsCount(62);
        destinationForever.setStartingPrice("₹1,20,000");
        destinationForever.setExperience("6 Years");
        destinationForever.setSpecialization("Beach Romance & Sunset Setup");
        destinationForever.setPhone("+91 98765 22222");
        destinationForever.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300");
        destinationForever.setCoverImageUrl("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800");
        destinationForever.setDescription("Exquisite beach destination weddings, sunset mandaps, and luxury coastal receptions in Goa and Kerala.");

        Planner vedicRituals = new Planner();
        vedicRituals.setBusinessName("Vedic Rituals & Royal Events");
        vedicRituals.setOwnerName("Rajesh Sharma");
        vedicRituals.setCity("Jaipur");
        vedicRituals.setRating(4.8);
        vedicRituals.setReviewsCount(35);
        vedicRituals.setStartingPrice("₹2,00,000");
        vedicRituals.setExperience("10 Years");
        vedicRituals.setSpecialization("Traditional Rajasthani Royal Mandaps");
        vedicRituals.setPhone("+91 98765 33333");
        vedicRituals.setAvatarUrl("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300");
        vedicRituals.setCoverImageUrl("https://images.unsplash.com/photo-1544077960-604201fe74bc?auto=format&fit=crop&w=800");
        vedicRituals.setDescription("Heritage fort weddings, royal elephant processions, and authentic Marwari & Rajputana traditional ceremonies.");

        plannerRepository.saveAll(List.of(royalTouch, destinationForever, vedicRituals));
    }

    private void seedPackages() {
        List<Planner> planners = plannerRepository.findAll();
        Planner royalTouch = planners.get(0);
        Planner destinationForever = planners.get(1);

        WeddingPackage royalHeritage = new WeddingPackage();
        royalHeritage.setPlannerId(royalTouch.getId());
        royalHeritage.setPlannerName(royalTouch.getBusinessName());
        royalHeritage.setTitle("Royal Heritage Destination Package");
        royalHeritage.setPrice("₹7,65,600");
        royalHeritage.setCategory("Royal Destination");
        royalHeritage.setTag("Palace Theme");
        royalHeritage.setCapacity("300 Guests");
        royalHeritage.setImageUrl("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800");
        royalHeritage.setDescription("Exquisite 3-day royal palace wedding package in Udaipur with imported floral decor, live Sangeet stage, and gourmet catering.");
        royalHeritage.setFeatures(List.of(
                "3-Day Luxury Resort Takeover",
                "Imported Floral Mandap & Entry Arch",
                "Live Shehnai, Folk Artists & DJ Night",
                "Gourmet Multi-Cuisine Live Buffets"
        ));

        WeddingPackage sunsetBeach = new WeddingPackage();
        sunsetBeach.setPlannerId(destinationForever.getId());
        sunsetBeach.setPlannerName(destinationForever.getBusinessName());
        sunsetBeach.setTitle("Sunset Beach Romance Package");
        sunsetBeach.setPrice("₹7,20,000");
        sunsetBeach.setCategory("Beach Romance");
        sunsetBeach.setTag("Beach Theme");
        sunsetBeach.setCapacity("200 Guests");
        sunsetBeach.setImageUrl("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800");
        sunsetBeach.setDescription("Dreamy 2-day beach mandap wedding package at a 5-star South Goa seaside resort.");
        sunsetBeach.setFeatures(List.of(
                "Beachfront Sunset Mandap Setup",
                "Acoustic Live Music & Beach Cocktail",
                "Seafood & International Live Counters",
                "Drone Aerial Coverage & Video Highlight"
        ));

        weddingPackageRepository.saveAll(List.of(royalHeritage, sunsetBeach));
    }

    private void seedDemoClientProfile() {
        ClientProfile profile = new ClientProfile();
        profile.setUserId(1L);
        profile.setFullName("TEJASSAYANE067");
        profile.setEmail("client@gmail.com");
        profile.setPhone("+91 98765 43210");
        profile.setCity("Mumbai");
        profile.setPartnerName("Meera Kapoor");
        profile.setEmergencyPhone("+91 98765 99999");
        profile.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400");
        clientProfileRepository.save(profile);
    }

    private void seedDemoBooking() {
        Planner royalTouch = plannerRepository.findAll().get(0);

        Booking booking = new Booking();
        booking.setUserId(1L);
        booking.setBookingNumber("WPB-882910");
        booking.setClientName("TEJASSAYANE067");
        booking.setClientEmail("client@gmail.com");
        booking.setPlannerId(royalTouch.getId());
        booking.setPlannerName(royalTouch.getBusinessName());
        booking.setPlannerPhone(royalTouch.getPhone());
        booking.setPlannerAvatar(royalTouch.getAvatarUrl());
        booking.setPackageName("Royal Heritage Destination Package");
        booking.setVenue("The Leela Palace Resort, Udaipur");
        booking.setLocation("Lake Pichola, Udaipur, Rajasthan • Udaipur");
        booking.setWeddingDate(LocalDate.of(2026, 11, 20));
        booking.setGuestCount("300 Guests");
        booking.setAmount("₹7,65,600");
        booking.setStatus("CONFIRMED");
        booking.setPaymentStatus("PARTIALLY_PAID");
        booking.setStageText("Stage 3 of 8: Advance Payment Received");

        bookingRepository.save(booking);
    }

    private void seedDemoPayment() {
        Payment payment = new Payment();
        payment.setUserId(1L);
        payment.setPaymentNumber("PAY-9001");
        payment.setBookingNumber("WPB-882910");
        payment.setClientName("TEJASSAYANE067");
        payment.setAmount("₹2,29,680");
        payment.setType("30% Advance Payment");
        payment.setPaymentDate(LocalDate.of(2026, 7, 28));
        payment.setGateway("Razorpay");
        payment.setStatus("Successful");

        paymentRepository.save(payment);
    }
}
