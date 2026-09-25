import { WEDDING_DETAILS } from '../weddingConfig';

/**
 * Creates Google Calendar URL
 */
export const getGoogleCalendarUrl = (): string => {
  const title = encodeURIComponent(`Baraat: ${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName}`);
  const details = encodeURIComponent(
    `Baraat ceremony of ${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName}.\nReception: ${WEDDING_DETAILS.receptionTime}\n${WEDDING_DETAILS.rukhsatiTime}\nVenue: ${WEDDING_DETAILS.venueName}, ${WEDDING_DETAILS.venueAddress}`
  );
  const location = encodeURIComponent(`${WEDDING_DETAILS.venueName}, ${WEDDING_DETAILS.venueAddress}`);
  // 20261222T193000 to 20261222T230000 in PKT (UTC+5 -> 143000Z to 180000Z)
  const dates = '20261222T143000Z/20261222T180000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
};

/**
 * Generates and downloads an iCalendar (.ics) file for Apple Calendar, Outlook, etc.
 */
export const downloadIcsFile = () => {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Baraat Invitation//Kashif and Sajila//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:baraat-kashif-sajila-20261222@wedding',
    'DTSTAMP:20260925T120000Z',
    'DTSTART:20261222T143000Z',
    'DTEND:20261222T180000Z',
    `SUMMARY:Baraat: ${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName}`,
    `DESCRIPTION:Baraat Ceremony of ${WEDDING_DETAILS.groomName} & ${WEDDING_DETAILS.brideName}\\nReception: ${WEDDING_DETAILS.receptionTime}\\n${WEDDING_DETAILS.rukhsatiTime}`,
    `LOCATION:${WEDDING_DETAILS.venueName}\\, ${WEDDING_DETAILS.venueAddress}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Baraat-Kashif-and-Sajila.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
