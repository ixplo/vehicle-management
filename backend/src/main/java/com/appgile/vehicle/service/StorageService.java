package com.appgile.vehicle.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
public class StorageService {
    private final S3Client s3Client;
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    @Value("${cloud.aws.s3.max-file-size:5242880}")
    private long maxFileSize;
    @Value("${cloud.aws.s3.endpoint:}")
    private String s3Endpoint;
    
    public StorageService(S3Client s3Client) {
        this.s3Client = s3Client;
    }

    public String publishPhoto(MultipartFile file) {
        log.debug("Publishing file {}", file.getOriginalFilename());
        validateFile(file);
        String fileName = "vehicles/" + UUID.randomUUID() + "." + getFileExtension(file);
        try {
            s3Client.putObject(PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(fileName)
                            .contentType(file.getContentType())
                            .build(),
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize())
            );
        } catch (IOException e) {
            throw new IllegalArgumentException("Failed to upload file", e);
        }

        return fileName;
    }

    public byte[] getFile(String fileName) {
        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        try (ResponseInputStream<GetObjectResponse> s3Object = s3Client.getObject(getObjectRequest)) {
            return s3Object.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read object from S3", e);
        }
    }

    private String getFileExtension(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();
        if (originalFilename != null && originalFilename.contains(".")) {
            return originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
        }
        return "";
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        String contentType = file.getContentType();
        if (!("image/jpeg".equals(contentType) || "image/png".equals(contentType))) {
            throw new IllegalArgumentException("Only JPEG or PNG files are allowed");
        }

        if (file.getSize() > maxFileSize) {
            throw new IllegalArgumentException("File size must be ≤ " + (maxFileSize / (1024 * 1024)) + "MB");
        }
    }
}
