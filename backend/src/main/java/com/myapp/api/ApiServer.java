package com.myapp.api;

import com.google.gson.Gson;
import com.myapp.dao.UserDAO;
import com.myapp.model.User;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.util.List;

public class ApiServer {

    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Endpoint: /api/users
        server.createContext("/api/users", new UsersHandler());

        server.setExecutor(null); // Default executor
        System.out.println("Servidor API iniciado en http://localhost:" + port + "/api/users");
        server.start();
    }

    static class UsersHandler implements HttpHandler {
        private final UserDAO userDAO = new UserDAO();
        private final Gson gson = new Gson();

        @Override
        public void handle(HttpExchange exchange) throws IOException {
            // Manejo de CORS (Permitir peticiones del frontend)
            exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
            exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, OPTIONS");
            exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type,Authorization");

            if ("OPTIONS".equalsIgnoreCase(exchange.getRequestMethod())) {
                exchange.sendResponseHeaders(204, -1);
                return;
            }

            if ("GET".equalsIgnoreCase(exchange.getRequestMethod())) {
                try {
                    List<User> users = userDAO.getAllUsers();
                    String jsonResponse = gson.toJson(users);

                    byte[] responseBytes = jsonResponse.getBytes("UTF-8");
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(200, responseBytes.length);

                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(responseBytes);
                    }
                } catch (Exception e) {
                    sendError(exchange, e.getMessage(), 500);
                }
            } else if ("POST".equalsIgnoreCase(exchange.getRequestMethod())) {
                try {
                    // Leer el cuerpo de la petición
                    java.util.Scanner s = new java.util.Scanner(exchange.getRequestBody()).useDelimiter("\\A");
                    String body = s.hasNext() ? s.next() : "";

                    // Convertir JSON a objeto User
                    User newUser = gson.fromJson(body, User.class);

                    // Guardar en la DB
                    userDAO.addUser(newUser);

                    String success = "{\"status\": \"success\"}";
                    byte[] successBytes = success.getBytes();
                    exchange.getResponseHeaders().set("Content-Type", "application/json");
                    exchange.sendResponseHeaders(201, successBytes.length);
                    try (OutputStream os = exchange.getResponseBody()) {
                        os.write(successBytes);
                    }
                } catch (Exception e) {
                    sendError(exchange, e.getMessage(), 400);
                }
            } else {
                exchange.sendResponseHeaders(405, -1); // Method Not Allowed
            }
        }

        private void sendError(HttpExchange exchange, String message, int code) throws IOException {
            String error = "{\"error\": \"" + message.replace("\"", "\\\"") + "\"}";
            byte[] errorBytes = error.getBytes();
            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.sendResponseHeaders(code, errorBytes.length);
            try (OutputStream os = exchange.getResponseBody()) {
                os.write(errorBytes);
            }
        }
    }
}
