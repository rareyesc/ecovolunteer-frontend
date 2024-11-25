export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    // Reemplazar caracteres para cumplir con el estándar Base64
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // Decodificar el payload
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Error al decodificar el token JWT:', e);
    return null;
  }
}