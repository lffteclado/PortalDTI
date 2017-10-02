IF EXISTS(SELECT 1 FROM sysobjects WHERE id = object_id('sp_BloqueiaPlano'))
BEGIN
	DROP PROCEDURE dbo.sp_BloqueiaPlano
END
GO
CREATE PROCEDURE dbo.sp_BloqueiaPlano
/*
* PROCEDURE CRIADA PARA BLOQUER E DESBLOQUEAR PLANOS
* AUTOR: Lu�s Felipe Ferreira
* Data: 08/09/2017
*/

@CodigoEmpresa numeric(4),
@CodigoPlano char(8),
@PlanoBloqueado char(1)
--@BDEmpresa char(10)

AS
BEGIN
 IF (@CodigoEmpresa = 1200)
 BEGIN
	UPDATE dbAutosete.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END
 IF (@CodigoEmpresa = 262)
 BEGIN
	UPDATE dbCalisto.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END
IF (@CodigoEmpresa = 930)
 BEGIN
	UPDATE dbCardiesel_I.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 2630)
 BEGIN
	UPDATE dbGoias.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END
IF (@CodigoEmpresa = 2890)
 BEGIN
	UPDATE dbPostoImperialDP.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END
IF (@CodigoEmpresa = 3610)
 BEGIN
	UPDATE dbRedeMineira.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 2620)
 BEGIN
	UPDATE dbUberlandia.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 130)
 BEGIN
	UPDATE dbVadiesel.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END	
IF (@CodigoEmpresa = 260)
 BEGIN
	UPDATE dbValadaresCNV.dbo.tbPlanoPagamento
	SET BloqueadoPlanoPagto = @PlanoBloqueado
	WHERE CodigoPlanoPagamento = @CodigoPlano
	AND CodigoEmpresa = @CodigoEmpresa
 END				
END