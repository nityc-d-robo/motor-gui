// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn motor_pwm(address: u8, power: i16) {
    println!("アドレス0x{:>02x}のモーターが{power}で回ったとしましょう", address);
}
#[tauri::command]
fn solenoid_state(address: u8, port: u8, state: i16) {
    println!("アドレス0x{:>02x}のSDのポート{port}の出力が{state}になったとしましょう", address | 0x10);
}
#[tauri::command]
fn servo_angle(address: u8, port: u8, angle: i16) {
    println!("アドレス0x{:>02x}のSMDのポート{port}の角度が{angle}度になったとしましょう", address | 0x20);
}
#[tauri::command]
fn blmd_speed(address: u8, port: u8, speed: i16) {
    println!("アドレス0x{:>02x}の{port}番ブラシレスモーターが{speed}RPMで回ったとしましょう", address | 0x30);
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![motor_pwm, solenoid_state, servo_angle, blmd_speed])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
