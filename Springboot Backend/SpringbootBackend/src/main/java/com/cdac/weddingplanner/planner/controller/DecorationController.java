package com.cdac.weddingplanner.planner.controller;

import com.cdac.weddingplanner.common.dto.ApiResponse;
import com.cdac.weddingplanner.planner.entity.DecorationOption;
import com.cdac.weddingplanner.planner.service.DecorationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planner/decorations")
@RequiredArgsConstructor
public class DecorationController {

    private final DecorationService decorationService;

    @PostMapping
    public ResponseEntity<ApiResponse<DecorationOption>> addDecoration(@RequestBody DecorationOption decoration) {
        DecorationOption saved = decorationService.addDecoration(decoration);
        return ResponseEntity.ok(ApiResponse.success("Decoration option added successfully", saved));
    }

    @GetMapping("/planner/{plannerId}")
    public ResponseEntity<ApiResponse<List<DecorationOption>>> getDecorations(@PathVariable Long plannerId) {
        List<DecorationOption> list = decorationService.getDecorationsByPlanner(plannerId);
        return ResponseEntity.ok(ApiResponse.success(list));
    }
}
