mod utils;

// use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern {
//     fn alert(s: &str);
// }

// pub fn greet() {
//     alert("Hello, elide!");
// }

pub fn greet_name(name: &str) -> String {
    return format!("Hello, {name}!");
}
