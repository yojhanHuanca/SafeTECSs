<?php
// 📌 Configuración de la conexión a la base de datos
$host = 'localhost';
$usuario = 'root';           // Cambia esto si tu usuario de MySQL es distinto
$contrasena = '';            // Pon tu contraseña si tiene
$base_datos = 'safetecs';

// 🌐 Crear conexión
$conn = new mysqli($host, $usuario, $contrasena, $base_datos);

// ⚠️ Verificar conexión
if ($conn->connect_error) {
    die('❌ Error de conexión: ' . $conn->connect_error);
}

// ✅ Conexión exitosa
//echo "Conectado correctamente a la base de datos.";
