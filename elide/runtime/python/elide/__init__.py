# -~- coding: utf-8 -~-

#  Copyright (c) 2024 Elide Technologies, Inc.
#
#  Licensed under the MIT license (the "License"); you may not use this file except in compliance
#  with the License. You may obtain a copy of the License at
#
#    https://opensource.org/license/mit/
#
#  Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
#  an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#  License for the specific language governing permissions and limitations under the License.

"""
 Defines Elide-specific APIs.
"""

import polyglot

# Registered polyglot bindings.
registered_py_symbols = {}

# Internal factory method for binding management.
def __bind_factory(name = None):
    def binder(obj):
        symbol = name or obj.__name__
        if symbol in registered_py_symbols:
            raise ValueError(f"Symbol '{symbol}' already bound for polyglot access.")

        # register the symbol
        polyglot.export_value(
            symbol,
            obj
        )
        return obj
    return binder

def bind(obj):
    """Binds a Python symbol within Elide's polyglot context; this exposes the symbol (at its regular name)
       for cross-language interop.

       This function is designed to be used as a parameterless decorator. For example:

       ```python
       from elide import bind

       @bind
       def my_function():
           # do something
           pass
       ```

       `bind` specifically exists to reuse a symbol's name as-defined in Python. To bind the symbol to a
       different name, use `poly`.

         :param obj: The Python object to bind for polyglot access.
         :return: The bound object, which is also registered for polyglot access.
       """

    return __bind_factory()(obj)

def poly(name = None):
    """Binds a Python symbol within Elide's polyglot context; this exposes the symbol at its regular given
       name, or at the name provided as a parameter, for cross-language interop.

       This function is designed to be used as a parameterized decorator. For example:

       ```python
       from elide import poly

       @poly("my_function")
       def some_function():
         # do something
         pass
       ```

       `poly` must be called even if no name is provided. `bind` is also provided as a shorthand which needs
       not be called, takes no parameters, and always uses the name of the symbol as defined in Python.

         :param name: The name to bind the symbol to for polyglot access. If not provided, the symbol's name
                        as defined in Python will be used.
         :return: The bound object, which is also registered for polyglot access.
       """

    return __bind_factory(name)
