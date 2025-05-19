-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS safetecs CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE safetecs;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(100) NOT NULL UNIQUE,
    nombre_completo VARCHAR(100) NOT NULL,
    codigo_alumno VARCHAR(20) NOT NULL UNIQUE,
    carrera VARCHAR(100) NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    foto VARCHAR(255) DEFAULT 'img/default.jpg',
    codigo_barras VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla historial de accesos
CREATE TABLE IF NOT EXISTS historial_accesos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    ubicacion VARCHAR(100),
    dispositivo VARCHAR(100),
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);

-- Tabla de alertas de emergencia
CREATE TABLE IF NOT EXISTS alertas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    mensaje TEXT,
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('activa', 'resuelta') DEFAULT 'activa',
    FOREIGN KEY (usuario_id) REFERENCES usuarios (id) ON DELETE CASCADE
);