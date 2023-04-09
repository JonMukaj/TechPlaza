provider "azurerm" {
  features {
  key_vault {
      purge_soft_delete_on_destroy = true
  }
  }
}

terraform {
  backend "azurerm" {
      resource_group_name  = "tfstate"
      storage_account_name = "tfstate20824"
      container_name       = "tfstate-test"
      key                  = "terraform.tfstate"
  }
}