module "rg_test" {
  source  = "../modules/resource_group"
  rg_name = var.rg_name
  region  = var.region
}

module "node_techplaza_test" {
  linux_fx_version = "DOCKER|techplaza.azurecr.io/techplaza-test:v0.1.0"
  source         = "../modules/app_service/app"
  node_rg        = var.rg_name
  region         = var.region
  node_app_name  = "techplaza-test"
  linux_plan_id   = var.linux_plan_id
}
