local AuthHandler = {
  VERSION  = "1.0.0",
  PRIORITY = 10,
}

function AuthHandler:new()
  AuthHandler.super.new(self, "tm-auth")
end

function AuthHandler:access(config)
  AuthHandler.super.access(self)

  -- 1. Extract Authorization header
  local authorization = kong.request.get_header("Authorization")
  if not authorization then
    return kong.response.error(401, "Unauthorized: Missing Authorization header")
  end

  -- 2. Call your auth service to validate the token
  local res = kong.client:request("tm-auth-service", {
    method = "GET", -- Or POST depending on your auth service
    path = "/auth/validate", -- Adjust the path
    headers = {
      ["Authorization"] = authorization
    }
  })

  -- 3. Handle auth service response
  if res.status == 200 then
    -- Authentication successful, optionally set user info in Kong
    kong.ctx.authenticated_user = res.body.username -- Example
  else
    return kong.response.error(401, "Unauthorized: Invalid token")
  end
end

return AuthHandler
