$user = @{
    firstName = 'Test'
    lastName  = 'User'
    age       = 20
    email     = 'test.user@example.com'
}
$json = $user | ConvertTo-Json
Invoke-RestMethod -Uri 'http://localhost:8080/api/users' -Method POST -Body $json -ContentType 'application/json'
