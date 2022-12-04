import { HardhatRuntimeEnvironment } from 'hardhat/types';

export default async function f(hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts, network } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const TOKEN = await deploy('TOKEN', {
    from: deployer,
    args: [],
    log: true,
  });
  const weth = await deploy('WETH', {
    from: deployer,
    log: true,
  });

  const factory = await deploy('UniswapV2Factory', {
    from: deployer,
    args: [deployer],
    log: true,
  });

  await deploy('UniswapV2Router02', {
    from: deployer,
    args: [factory.address, weth.address],
    log: true,
  });
}

f.tags = ['main']