CREATE PROCEDURE dbo.sp_BloqueiaPlano
/*
* PROCEDURE CRIADA PARA BLOQUER E DESBLOQUEAR PLANOS
* AUTOR: Luís Felipe Ferreira
* DATA: 08/09/2017
* ATUALIZAÇÃO: 02/01/2018
* MOTIVO: MIGRAÇÃO NOVO SERVIDOR 0.60
* AUTOR: LUÍS FELIPE
*/
@CodigoEmpresa numeric(4),
@CodigoPlano char(8),
@PlanoBloqueado char(1)
AS
BEGIN
 IF (@CodigoEmpresa = 1200)--AUTOSETE
 BEGIN
	UPDATE dbAutosete.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END
 IF (@CodigoEmpresa = 262)--CALISTO
 BEGIN
	UPDATE dbCalisto.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END
IF (@CodigoEmpresa = 930)--CARDIESEL
 BEGIN
	UPDATE dbCardiesel.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 2630)--GOIAS
 BEGIN
	UPDATE dbGoias.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END
IF (@CodigoEmpresa = 2890)--POSTO IMPERIAL
 BEGIN
	UPDATE dbPostoimperial.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END
IF (@CodigoEmpresa = 3610)--REDE MINEIRA
 BEGIN
	UPDATE dbRedeMineira.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 2620)--UBERLANDIA
 BEGIN
	UPDATE dbUberlandia.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 130)--VADIESEL
 BEGIN
	UPDATE dbVadiesel.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 260)--VALADARES
 BEGIN
	UPDATE dbValadares.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 3140)--MONTES CLAROS
 BEGIN
	UPDATE dbMontesClaros.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = CodigoEmpresa
 END			
END


