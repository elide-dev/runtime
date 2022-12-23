package elide.runtime.samples.wasm;

/**
 * A simple hello world example.
 *
 * <p>Note that it is marked as @JsType as we would like to call have whole class available to use
 * from JavaScript.
 */
public class HelloWorldWASM {
    public static String.NativeString getHelloWorldNative() {
        return "Hello from Java!".toJsString();
    }
}
