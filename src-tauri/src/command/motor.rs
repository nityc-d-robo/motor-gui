use motor_lib::{device_type, md, USBHandle};
use tauri::State;

#[tauri::command]
pub fn motor_pwm(handle: State<'_, USBHandle>, address: u8, power: i16) {
    let result = md::send_pwm(&*handle, address | device_type::MD, power).unwrap();
    println!("{:?}", result);
}
