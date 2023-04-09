resource "azurerm_app_service" "app" {
  name                = var.node_app_name
  location            = var.region
  resource_group_name = var.node_rg
  app_service_plan_id = var.linux_plan_id

  site_config {
    linux_fx_version          = var.linux_fx_version
    always_on                 = false
    use_32_bit_worker_process = true
  }

  lifecycle {
    ignore_changes = [
      site_config[0].linux_fx_version
    ]
  }
}
