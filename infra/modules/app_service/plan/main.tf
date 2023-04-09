resource "azurerm_app_service_plan" "example" {
  name                = var.node_name
  location            = var.region
  resource_group_name = var.node_rg
  kind                = "Linux"
  reserved            = true

  sku {
    tier = var.node_tier
    size = var.node_size
  }
}