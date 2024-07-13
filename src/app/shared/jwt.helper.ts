function isTokenExpired(token: string): boolean {
    if (!token) {
      return true;
    }
  
    const [, payload] = token.split('.');
    const decodedPayload = JSON.parse(atob(payload));
    const expiry = decodedPayload.exp;
  
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }