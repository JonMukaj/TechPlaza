data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "keyvault" {
  name                        = "kv-${var.tag_product}-az-we-${var.environment}"
  location                    = var.region
  resource_group_name         = var.rg_name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  purge_protection_enabled    = false

  sku_name = "standard"
  network_acls {
    default_action = "Deny"
    bypass         = "AzureServices"
  }

  tags = {
    env  = var.environment
    product = var.tag_product
    tfmanaged = true
  }
  lifecycle {
    ignore_changes = [access_policy, network_acls]
  }
}
