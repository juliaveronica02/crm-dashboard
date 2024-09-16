import axios from "axios";

export const fetchUserDeviceInfo = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    const ipAddress = response.data.ip;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    const formattedTime = now.toLocaleTimeString('en-GB', { hour12: false }); // HH:MM:SS format
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Calculate GMT/UTC offset
    const offsetMinutes = now.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
    const offsetMins = Math.abs(offsetMinutes) % 60;
    const sign = offsetMinutes <= 0 ? '+' : '-';
    const gmtOffset = `GMT${sign}${String(offsetHours).padStart(2, '0')}:${String(offsetMins).padStart(2, '0')}`;

    return {
      ip: ipAddress,
      browser: navigator.userAgent,
      platform: navigator.platform,
      time: `${formattedDate}, ${formattedTime} ${gmtOffset} (${userTimeZone})`,
    };
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return {};
  }
};