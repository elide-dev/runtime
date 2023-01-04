@file:Suppress("RedundantVisibilityModifier")

package elide.esbuild

import java.nio.file.Files
import java.util.UUID

/** JVM entrypoint for calling into `esbuild`. */
public object EsBuildEntry {
  @JvmStatic public fun main(args: Array<String>) {
    println("Hello esbuild entrypoint! Calling:")
    esbuildMain(arrayOf(
      "--help"
    ))
  }

  init {
    val path = "/elide/esbuild/esbuild_bin_/libbundler.dylib"
    val lib = EsBuildEntry::class.java.getResourceAsStream(path) ?: error("Failed to locate `libbundler.dylib`")
    val tempPath = Files.createTempDirectory("elide-bundler-${UUID.randomUUID()}")
    val tempFile = tempPath.resolve("libbundler.dylib").toFile()
    tempFile.deleteOnExit()

    lib.use { inputStream ->
      tempFile.outputStream().use { outStream ->
        outStream.write(inputStream.readAllBytes())
      }
    }
    println("Loading native lib at path '${tempFile.absolutePath}'...")
    System.load(tempFile.absolutePath)
  }

  /**
   * Call into `esbuild`.
   */
  @JvmStatic external fun esbuildMain(args: Array<String>): Int
}
