package elide.runtime.rs;

/**
 * TBD.
 */
public class ElideNativeRuntime {
    /**
     * Render a greeting.
     *
     * @param input Name to render.
     * @return Greeting for name.
     */
    private static native String greet(String input);
}
