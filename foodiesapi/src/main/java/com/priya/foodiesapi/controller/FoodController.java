package com.priya.foodiesapi.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.priya.foodiesapi.Service.FoodService;
import com.priya.foodiesapi.io.FoodRequest;
import com.priya.foodiesapi.io.FoodResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import com.fasterxml.jackson.core.JsonProcessingException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin(origins = {"http://localhost:5174","http://localhost:5173"})
public class FoodController {

   private final FoodService foodService;

    @PostMapping
    public FoodResponse addFood(@RequestPart("food")String foodString,
                                @RequestPart("file")MultipartFile file){
        ObjectMapper objectMapper = new ObjectMapper();
        FoodRequest request = null;
        try{
           request = objectMapper.readValue(foodString,FoodRequest.class);
        }catch(JsonProcessingException ex){
           throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Invalid JSON format");
        }
      FoodResponse response = foodService.addFood(request,file);
        return response;
    }

    @GetMapping
    public List<FoodResponse> readFoods(){
        return foodService.readFoods();
    }

    @GetMapping("/{id}")
   public FoodResponse readFood(@PathVariable String id){
            return foodService.readFood(id);
   }
   @DeleteMapping("/{id}")
   @ResponseStatus(HttpStatus.NO_CONTENT)
   public  void deleteFood(@PathVariable String id){
        foodService.deleteFood(id);

   }

    @GetMapping("/count")
    public ResponseEntity<Long> getFoodCount(){
        return ResponseEntity.ok(foodService.getFoodCount());
    }

    @GetMapping("/category/count")
    public ResponseEntity<Map<String, Long>> getCategoryCount(){
        return ResponseEntity.ok(foodService.getCategoryCount());
    }
}
