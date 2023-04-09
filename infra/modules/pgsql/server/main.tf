resource "azurerm_postgresql_flexible_server" "pgsql_server" {
  name                   = var.name 
  resource_group_name    = var.pgsql_rg_name 
  location               = var.region
  version                = var.pgsql_version
  sku_name               = var.pgsql_sku
  storage_mb             = var.pgsql_storage_mb
  administrator_login    = var.pgsql_user
  administrator_password = var.pgsql_password
  backup_retention_days  = var.backup_retention_days
  geo_redundant_backup_enabled = true

  tags = {
    env       = var.environment
    product   = var.tag_product
    tfmanaged = true
  }

  authentication {
    active_directory_auth_enabled = true
    password_auth_enabled         = true
    tenant_id                     = var.tenant_id
  }

  lifecycle {
    ignore_changes = [zone, administrator_password, high_availability.0.standby_availability_zone, high_availability.0.mode]
  }
}
