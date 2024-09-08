const interfaceConfigOverwrite = {
  TOOLBAR_BUTTONS: [
    "microphone",
    "camera",
    "reactions", // Replacing 'raisehand' with 'reactions'
    "videoquality",
    "tileview",
    "pip", // Adding Picture-in-Picture button
    "fullscreen",
    "hangup",
    "profile",
    "participants-pane",
    "desktop", // Adding 'share screen'
    "settings", // To open the View Profile button
  ],
  SHOW_BRAND_WATERMARK: false,
  SHOW_JITSI_WATERMARK: false,
  SHOW_WATERMARK_FOR_GUESTS: false,
  DEFAULT_LOGO_URL: "",
  SHOW_BRAND_WATERMARK: false,
  SHOW_POWERED_BY: false,
  TOOLBAR_TIMEOUT: 4000,
  DISABLE_PRESENCE_STATUS: true,
  DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
  DISABLE_FOCUS_INDICATOR: true,
  HIDE_INVITE_MORE_HEADER: true,
  CONNECTION_INDICATOR_DISABLED: true,
  VIDEO_QUALITY_LABEL_DISABLED: true,
  LOCAL_THUMBNAIL_RATIO: 16 / 9,
  REMOTE_THUMBNAIL_RATIO: 16 / 9,
  SHOW_PROMOTIONAL_CLOSE_PAGE: false,
  JITSI_WATERMARK_LINK: "",
  DEFAULT_REMOTE_DISPLAY_NAME: "",
  DEFAULT_LOCAL_DISPLAY_NAME: "",
  SHOW_CHROME_EXTENSION_BANNER: false,
  MOBILE_APP_PROMO: false,
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
  DISABLE_TRANSCRIPTION_SUBTITLES: true,
  DISABLE_POLLS: true,
  LOGO_CLICK_URL: "",
};

const configOverwrite = {
  disableDeepLinking: true,
  startWithAudioMuted: true,
  startWithVideoMuted: true,
  autoMute: true,
  enableCalendarIntegration: false,
  enableClosePage: false,
  SHOW_PROMOTIONAL_CLOSE_PAGE: false,
  brandingDataUrl: "",
  prejoinPageEnabled: false,
  disableThirdPartyRequests: true,
};

export { interfaceConfigOverwrite, configOverwrite };
