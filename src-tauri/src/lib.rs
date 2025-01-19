use motor_lib::{blmd, device_type, md, sd, smd, USBHandle};
use tauri::{Manager, State};

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn motor_pwm(handle: State<'_, USBHandle>, address: u8, power: i16) {
    let result = md::send_pwm(&*handle, address | device_type::MD, power).unwrap();
    println!("{:?}", result);
}
#[tauri::command]
fn solenoid_state(handle: State<'_, USBHandle>, address: u8, port: u8, state: i16) {
    let result = sd::send_power(&*handle, address | device_type::SD, port, state).unwrap();
    println!("{:?}", result);
}
#[tauri::command]
fn servo_angle(handle: State<'_, USBHandle>, address: u8, port: u8, angle: i16) {
    let result = smd::send_angle(
        &*handle,
        address | device_type::SMD,
        port,
        angle.try_into().unwrap(),
    )
    .unwrap();
    println!("{:?}", result);
}
#[tauri::command]
fn blmd_speed(handle: State<'_, USBHandle>, address: u8, controller_id: u8, velocity: i16) {
    let result = blmd::send_velocity(
        &*handle,
        address | device_type::BLMD,
        controller_id,
        velocity,
    )
    .unwrap();
    println!("{:?}", result);
}

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
            motor_pwm,
            solenoid_state,
            servo_angle,
            blmd_speed
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
