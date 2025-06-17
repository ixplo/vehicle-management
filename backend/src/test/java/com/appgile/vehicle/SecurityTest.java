package com.appgile.vehicle;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.SecretKey;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class SecurityTest {

    private static final SecretKey secretKey = Keys.hmacShaKeyFor(
            Decoders.BASE64.decode("Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5MDEyMzQ1Njc4OTA=")
    );
    
    @Test
    void tokenTest() {
        String token = Jwts.builder()
                .setSubject("john.doe")
                .setIssuedAt(new Date())
                .setExpiration(Date.from(Instant.now().plus(10, ChronoUnit.DAYS)))
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
        assertNotNull(token);
    }
}
