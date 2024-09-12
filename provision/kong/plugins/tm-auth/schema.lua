local typedefs = require "kong.db.schema.typedefs"

return {
  name = "tm-auth",
  fields = {
    { config = {
        type = "record",
        fields = {
          { auth_service_url = { type = "string", default = "http://tm-auth-service:3000" } },
          { validate_path = { type = "string", default = "/auth/validate" } }
        }
      }
    }
  }
}
