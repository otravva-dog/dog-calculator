<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli'){http_response_code(404);exit;}
require_once dirname(__DIR__).'/autoload.php';
function cliOptions(): array {$options=getopt('',['private:','source:','apply','verify','init','output:']);if(!isset($options['private'])||!is_dir($options['private']))throw new RuntimeException('Use --private=/absolute/path/to/private-directory');return $options;}
function fail(string $message,int $status=400): never {throw new RuntimeException($message);}

function cliMySql(array $options,bool $checkSchema=true): PDO { $config=Nutrition\Support\Database::configuration($options['private']);if($config['driver']!=='mysql')throw new RuntimeException('A MySQL configuration is required in the selected private directory');return Nutrition\Support\Database::connect($options['private'],$config,$checkSchema); }
