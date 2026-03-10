package com.myapp;

import com.myapp.dao.UserDAO;
import com.myapp.model.User;
import java.util.List;

public class TestDBConnection {
    public static void main(String[] args) {
        System.out.println("--- Iniciando Test de Integracion ---");
        UserDAO userDAO = new UserDAO();
        try {
            System.out.println("Intentando recuperar usuarios de la base de datos...");
            List<User> users = userDAO.getAllUsers();

            if (users.isEmpty()) {
                System.out.println("Conexion exitosa, pero no se encontraron usuarios.");
            } else {
                System.out.println("¡Conexion exitosa! Usuarios encontrados:");
                for (User user : users) {
                    System.out.println(" - " + user.getFirstName() + " " + user.getLastName() + " (Email: "
                            + user.getEmail() + ")");
                }
            }
        } catch (Exception e) {
            System.err.println("¡ERROR! No se pudo conectar a la base de datos.");
            e.printStackTrace();
        }
        System.out.println("--- Test Finalizado ---");
    }
}
