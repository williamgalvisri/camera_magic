import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "camera.es.app",
    appName: "Magic Camera",
    webDir: "dist",
    plugins: {
        LocalNotifications: {
            smallIcon: "ic_stat_icon_config_sample",
            iconColor: "#488AFF"
        },
    },
};

export default config;
