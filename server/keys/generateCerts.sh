# @echo off
# set OPENSSL_CONF=/System/Library/OpenSSL/openssl.cnf 

# echo Generate CA key:
# openssl genrsa -passout pass:1111 -des3 -out ca.key 4096

# echo Generate CA certificate:
# openssl req -passin pass:1111 -new -x509 -days 365 -key ca.key -out ca.crt -subj  "/C=US/ST=CA/L=Cupertino/O=YourCompany/OU=YourApp/CN=MyRootCA"

# echo Generate server key:
# openssl genrsa -passout pass:1111 -des3 -out server.key 4096

# echo Generate server signing request:
# openssl req -passin pass:1111 -new -key server.key -out server.csr -subj  "/C=US/ST=CA/L=Cupertino/O=YourCompany/OU=YourApp/CN=$(hostname)"

# echo Self-sign server certificate:
# openssl x509 -req -passin pass:1111 -days 365 -in server.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out server.crt

# echo Remove passphrase from server key:
# openssl rsa -passin pass:1111 -in server.key -out server.key

# echo Generate client key
# openssl genrsa -passout pass:1111 -des3 -out client.key 4096

# echo Generate client signing request:
# openssl req -passin pass:1111 -new -key client.key -out client.csr -subj  "/C=US/ST=CA/L=Cupertino/O=YourCompany/OU=YourApp/CN=$(hostname)"

# echo Self-sign client certificate:
# openssl x509 -passin pass:1111 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -set_serial 01 -out client.crt

# echo Remove passphrase from client key:
# openssl rsa -passin pass:1111 -in client.key -out client.key


PASSWORD=grpc
if [ $# -ge 1 ]
  then
    PASSWORD=$1
fi

cat <<EOT >>dev.config
[ req ]
default_bits       = 2048
default_md         = sha256
default_keyfile    = dev.key
prompt             = no
encrypt_key        = no
distinguished_name = dn
req_extensions     = v3_req
x509_extensions    = x509_req
string_mask        = utf8only
[ dn ]
commonName             = localhost dev cert
emailAddress           = test@localtest.me
countryName            = US
stateOrProvinceName    = DE
localityName           = Wilmington
organizationName       = Todo World
[ x509_req ]
subjectKeyIdentifier   = hash
authorityKeyIdentifier = keyid,issuer
basicConstraints       = critical, CA:false
keyUsage               = critical, keyEncipherment
subjectAltName         = @alt_names
# extendedKeyUsage  = serverAuth, clientAuth
nsComment              = "OpenSSL Generated Certificate"
[ v3_req ]
subjectKeyIdentifier   = hash
basicConstraints       = critical, CA:false
subjectAltName         = @alt_names
# extendedKeyUsage  = serverAuth, clientAuth
nsComment              = "OpenSSL Generated Certificate"
[ alt_names ]
DNS.1                  = localhost
EOT

openssl req -config dev.config -new -out dev.csr.pem
openssl x509 -req -days 365 -extfile dev.config -extensions v3_req -in dev.csr.pem -signkey dev.key -out dev.crt
openssl pkcs12 -export -out dev.pfx -inkey dev.key -in dev.crt -password pass:$PASSWORD
cp dev.pfx .
# rm dev.config dev.csr.pem