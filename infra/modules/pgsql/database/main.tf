resource "azurerm_postgresql_flexible_server_database" "pgsq_db" {
  name      = var.pgsql_db_name
  server_id = var.pgsql_id
  collation = var.pgsql_collation
  charset   = var.pgsql_charset
}
