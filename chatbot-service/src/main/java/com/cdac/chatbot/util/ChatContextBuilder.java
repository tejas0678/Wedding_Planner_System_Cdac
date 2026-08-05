package com.cdac.chatbot.util;

import com.cdac.chatbot.dto.FaqDTO;
import com.cdac.chatbot.dto.PackageDTO;
import com.cdac.chatbot.dto.PlannerDTO;
import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

/**
 * Turns raw backend DTOs into a compact, human-readable context block that
 * gets embedded in the Grok system prompt. Precomputes a few facts (top
 * rated planner, cheapest/most expensive package) up front so the model
 * doesn't have to reliably scan a long list itself.
 */
@Component
public class ChatContextBuilder {

    public String build(List<PlannerDTO> planners, List<PackageDTO> packages, List<FaqDTO> faqs) {
        StringBuilder sb = new StringBuilder();

        sb.append("=== KEY FACTS ===\n");
        appendTopRatedPlanner(sb, planners);
        appendCheapestPackage(sb, packages);
        appendPremiumPackage(sb, packages);
        sb.append("\n");

        sb.append("=== PLANNERS (").append(planners.size()).append(") ===\n");
        for (PlannerDTO p : planners) {
            sb.append("- ").append(nullSafe(p.getName()))
                    .append(" | city: ").append(nullSafe(p.getCity()))
                    .append(" | rating: ").append(p.getRating() != null ? p.getRating() : "N/A")
                    .append(" | experience: ").append(nullSafe(p.getExperience()))
                    .append(" | starting price: ").append(nullSafe(p.getStartingPrice()))
                    .append(" | about: ").append(truncate(p.getDescription(), 160))
                    .append("\n");
        }
        sb.append("\n");

        sb.append("=== PACKAGES (").append(packages.size()).append(") ===\n");
        for (PackageDTO pkg : packages) {
            sb.append("- ").append(nullSafe(pkg.getPackageName()))
                    .append(" | price: ").append(pkg.getPrice() != null ? pkg.getPrice() : "N/A")
                    .append(" | category: ").append(nullSafe(pkg.getCategory()))
                    .append(" | event type: ").append(nullSafe(pkg.getEventType()))
                    .append(" | theme: ").append(nullSafe(pkg.getTheme()))
                    .append(" | city: ").append(nullSafe(pkg.getCity()))
                    .append(" | guests: ").append(pkg.getGuestCapacity() != null ? pkg.getGuestCapacity() : "N/A")
                    .append(" | includes: ").append(truncate(pkg.getServicesIncluded(), 160))
                    .append("\n");
        }
        sb.append("\n");

        sb.append("=== FAQS (").append(faqs.size()).append(") ===\n");
        for (FaqDTO faq : faqs) {
            sb.append("- [").append(nullSafe(faq.getTopic())).append("] ")
                    .append(nullSafe(faq.getQuestion())).append(" -> ")
                    .append(nullSafe(faq.getAnswer()))
                    .append("\n");
        }

        return sb.toString();
    }

    private void appendTopRatedPlanner(StringBuilder sb, List<PlannerDTO> planners) {
        Optional<PlannerDTO> topOverall = planners.stream()
                .filter(p -> p.getRating() != null)
                .max(Comparator.comparingDouble(PlannerDTO::getRating));
        topOverall.ifPresent(p -> sb.append("Top rated planner overall: ").append(p.getName())
                .append(" (rating ").append(p.getRating()).append(", ").append(nullSafe(p.getCity())).append(")\n"));

        planners.stream()
                .map(PlannerDTO::getCity)
                .filter(c -> c != null && !c.isBlank())
                .distinct()
                .forEach(c -> planners.stream()
                        .filter(p -> c.equalsIgnoreCase(p.getCity()) && p.getRating() != null)
                        .max(Comparator.comparingDouble(PlannerDTO::getRating))
                        .ifPresent(p -> sb.append("Top rated planner in ").append(c).append(": ")
                                .append(p.getName()).append(" (rating ").append(p.getRating()).append(")\n")));
    }

    private void appendCheapestPackage(StringBuilder sb, List<PackageDTO> packages) {
        packages.stream()
                .filter(p -> p.getPrice() != null)
                .min(Comparator.comparing(PackageDTO::getPrice))
                .ifPresent(p -> sb.append("Cheapest package: ").append(p.getPackageName())
                        .append(" (").append(p.getPrice()).append(")\n"));
    }

    private void appendPremiumPackage(StringBuilder sb, List<PackageDTO> packages) {
        packages.stream()
                .filter(p -> p.getPrice() != null)
                .max(Comparator.comparing(PackageDTO::getPrice))
                .ifPresent(p -> sb.append("Most premium package: ").append(p.getPackageName())
                        .append(" (").append(p.getPrice()).append(")\n"));
    }

    private String nullSafe(String value) {
        return value == null || value.isBlank() ? "N/A" : value;
    }

    private String truncate(String value, int maxLen) {
        if (value == null || value.isBlank()) return "N/A";
        return value.length() <= maxLen ? value : value.substring(0, maxLen) + "...";
    }
}
