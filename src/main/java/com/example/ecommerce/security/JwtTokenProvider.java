package com.example.ecommerce.security;

import com.example.ecommerce.model.JwtUserDetails;
import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    // @Value("${todoapp.app.secret}")
    private final String APP_SECRET = "todo";
    //@Value("${todoapp.expires.in}")
    private final long EXPIRES_IN = 604800;

    public String generateJwtToken(Authentication auth){

        JwtUserDetails userDetails = (JwtUserDetails) auth.getPrincipal();
        Date expireDate = new Date(new Date().getTime() + EXPIRES_IN);
        return Jwts.builder().setSubject(userDetails.getUsername())
                .setExpiration(expireDate).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS512, APP_SECRET)
                .compact();
    }

    public String getUserNameFromJwtToken(String token){
        Claims claims = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token).getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token){

        try {
            Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token);
            return !isTokenExpired(token);
        }
        catch (SignatureException | IllegalArgumentException | MalformedJwtException | ExpiredJwtException | UnsupportedJwtException e){
            return false;
        }
    }

    public boolean isTokenExpired(String token){
        Date expiration = Jwts.parser().setSigningKey(APP_SECRET).parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }

}

