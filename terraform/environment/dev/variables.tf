variable "tags" {
  default = {
    "Environment" = "dev"
    "Owner"       = "sdupegui"
  }
}

variable "environment" {
  default = "dev"
}

variable "suffix" {
  default = "sdupegui-js-application"
}