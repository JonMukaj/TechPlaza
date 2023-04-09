variable "region" {
  type = string
}
variable "service" {
  type = string
}
variable "environment" {
  type = string
}
variable "name" {
  type    = string
  default = null
}
variable "pgsql_version" {
  type = string
}
variable "pgsql_user" {
  type = string
}
variable "pgsql_password" {
  type = string
}
variable "pgsql_sku" {
  type = string
}
variable "pgsql_rg_name" {
  type    = string
  default = null
}
variable "pgsql_storage_mb" {
  type    = number
}
variable "tag_product" {}

variable "delegated_subnet_id" {
  default = null
}
variable "private_dns_zone_id" {
  default = null
}
variable "tenant_id" {
  default = null
}
variable "backup_retention_days" {
  default = null
}
