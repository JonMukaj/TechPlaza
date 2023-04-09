variable "region" {
  type = string
}
variable "node_name" {
  type = string
}
variable "node_rg" {
  type = string
}
variable "node_tier" {
  type = string
  default = "Free"
}
variable "node_size" {
  type = string
  default = "F1"
}
