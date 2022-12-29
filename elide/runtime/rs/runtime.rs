use wasm_bindgen::prelude::*;
use web_sys::console;

use lib;

pub fn greet_lib() {
    lib::greet();
}

#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    // say hello
    let greeting = lib::greet_name("WASM");
    console::log_2(&"From Rust: ".into(), &greeting.into());

    Ok(())
}
