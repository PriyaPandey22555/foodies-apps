package com.priya.foodiesapi.Service;

import com.priya.foodiesapi.io.FoodRequest;
import com.priya.foodiesapi.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface FoodService {

   String  uploadFile(MultipartFile file);

   FoodResponse addFood(FoodRequest request, MultipartFile file);

   List <FoodResponse> readFoods();

   FoodResponse readFood(String id);

    boolean deleteFile(String filename);

     void deleteFood(String id);
    Long getFoodCount();
    Map<String, Long> getCategoryCount();
}
