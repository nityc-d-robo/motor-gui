use motor_lib::USBHandle;
use tauri::Manager;
mod command;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let handle = USBHandle::new(0x483, 0x5740, 1);
            app.manage(handle);
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            command::motor_pwm,
            command::solenoid_state,
            command::servo_angle,
            command::blmd_speed,
            command::emergency_stop
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
