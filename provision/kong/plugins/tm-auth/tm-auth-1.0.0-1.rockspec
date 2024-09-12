-- tm-auth-1.0.0-1.rockspec

package = "tm-auth"
version = "1.0.0-1"

source = {
  type = "local",
  tree = "." 
}

build = {
  type = "builtin",
  modules = {
    ["kong.plugins.tm-auth.handler"] = "handler.lua",
    ["kong.plugins.tm-auth.schema"] = "schema.lua"
  }
}
