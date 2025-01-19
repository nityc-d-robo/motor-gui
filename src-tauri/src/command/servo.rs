use motor_lib::{device_type, smd, USBHandle};
use tauri::State;

#[tauri::command]
pub fn servo_angle(handle: State<'_, USBHandle>, address: u8, port: u8, angle: i16) {
    let result = smd::send_angle(
        &*handle,
        address | device_type::SMD,
        port,
        angle.try_into().unwrap(),
    )
    .unwrap();
    println!("{:?}", result);
}
