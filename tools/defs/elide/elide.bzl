def _elide_impl_test(ctx):
    """Run a test using the Elide runtime binary."""

    # resolve the elide binary
    elide_attr = ctx.attr._elide
    elide_inputs, _, _ = ctx.resolve_command(tools = [elide_attr])
    elide_bin = elide_inputs[0]

    # resolve the script to run
    script = ctx.attr.test.files.to_list()[0]

    # declare a file to capture run output
    runner = ctx.actions.declare_file(ctx.label.name + ".runner")
    args_file = ctx.actions.declare_file(ctx.label.name + ".args")

    # assemble execution environment and outer command line
    env = {}
    args = ctx.actions.args()
    args.add("--language=JS")
    args.add(script.short_path)

    # write to args file
    ctx.actions.write(
        args_file,
        args,
    )

    # write to runner file
    ctx.actions.write(
        runner,
        "%s run @%s" % (elide_bin.path, args_file.short_path),
        is_executable = True,
    )

    return [DefaultInfo(
        files = depset([]),
        executable = runner,
        runfiles = ctx.runfiles(
            collect_data = True,
            collect_default = True,
            files = [elide_bin, args_file, script],
        ),
    )]

_elide_test = rule(
    test = True,
    implementation = _elide_impl_test,
    attrs = {
        "test": attr.label(
            allow_files = True,
        ),
        "_elide": attr.label(
            cfg = "host",
            default = "@elide_cli",
            allow_files = True,
            executable = True,
        ),
        "data": attr.label_list(
            allow_files = True,
        ),
    },
)

def _elide_test_macro(name, test, *args, **kwargs):
    """Macro for easily defining an Elide runtime test."""
    _elide_test(
        name = name,
        test = test,
        *args,
        **kwargs
    )

## Exports.
elide_test = _elide_test_macro
